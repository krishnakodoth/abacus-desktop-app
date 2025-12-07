import { jsPDF } from 'jspdf';

export function generateQuestionsPDF(questions, level, includeAnswers = false) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  
  let yPosition = margin;
  
  // Header section
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ABACUS', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  // Student details without box
  const detailsY = yPosition;
  const col1Start = margin;
  const col2Start = margin + 70;
  const col3Start = margin + 140;
  
  doc.text('Name: _________________________', col1Start, detailsY);
  doc.text('Class: ______________', col2Start, detailsY);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, col3Start, detailsY);
  
  yPosition = detailsY + 8;
  
  // Grid setup - 10 columns across (like screenshot)
  const questionsPerRow = 10;
  const questionsPerPage = 50; // 5 rows * 10 columns
  const cellWidth = (pageWidth - (margin * 2)) / questionsPerRow;
  const cellHeight = 45;
  
  questions.forEach((q, index) => {
    // Add new page if needed
    if (index > 0 && index % questionsPerPage === 0) {
      doc.addPage();
      yPosition = margin;
    }
    
    const indexInPage = index % questionsPerPage;
    const row = Math.floor(indexInPage / questionsPerRow);
    const col = indexInPage % questionsPerRow;
    
    const cellX = margin + (col * cellWidth);
    const cellY = yPosition + (row * cellHeight);
    
    // Draw cell border with thin lines
    doc.setLineWidth(0.2);
    doc.rect(cellX, cellY, cellWidth, cellHeight);
    
    // Question number at top center with gray background
    doc.setFillColor(240, 240, 240);
    doc.rect(cellX, cellY, cellWidth, 6, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(String(q.questionNumber), cellX + cellWidth / 2, cellY + 4.5, { align: 'center' });
    
    // Thin line below question number
    doc.setLineWidth(0.2);
    doc.line(cellX, cellY + 6, cellX + cellWidth, cellY + 6);
    
    // Numbers in vertical format (right-aligned within cell)
    doc.setFontSize(10);
    doc.setFont('courier', 'normal');
    let currentY = cellY + 12;
    const numberX = cellX + cellWidth - 3;
    
    q.numbers.forEach((num, idx) => {
      const displayNum = String(num);
      if (idx > 0) {
        // Operation symbol very close to the number (right before it)
        const operation = q.operations[idx - 1];
        const numWidth = displayNum.length * 3; // Approximate width of number
        const operationX = numberX - numWidth - 3; // Just before the number
        doc.text(operation, operationX, currentY);
      }
      doc.text(displayNum, numberX, currentY, { align: 'right' });
      currentY += 5;
    });
    
    // Thick underline for answer
    const underlineY = currentY + 1;
    doc.setLineWidth(0.5);
    doc.line(cellX + 2, underlineY, numberX, underlineY);
    currentY += 6;
    
    // Answer (if includeAnswers is true)
    if (includeAnswers) {
      doc.setFont('courier', 'bold');
      doc.setFontSize(9);
      const answerText = String(q.answer);
      doc.text(answerText, numberX, currentY, { align: 'right' });
    }
  });
  
  // Footer on all pages
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 6,
      { align: 'center' }
    );
  }
  
  return doc;
}

export function downloadQuestionsPDF(questions, level, includeAnswers = false) {
  const doc = generateQuestionsPDF(questions, level, includeAnswers);
  const filename = includeAnswers 
    ? `abacus-questions-answers-${Date.now()}.pdf`
    : `abacus-questions-${Date.now()}.pdf`;
  doc.save(filename);
}

export function generateExamResultsPDF(examData) {
  const { questions, totalTime, level } = examData;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  
  let yPosition = margin;
  
  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Abacus Exam Results', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  // Summary
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  
  doc.text(`Date: ${date} ${time}`, margin, yPosition);
  yPosition += 7;
  doc.text(`Level: ${level.name}`, margin, yPosition);
  yPosition += 7;
  doc.text(`Total Questions: ${questions.length}`, margin, yPosition);
  yPosition += 7;
  
  const mins = Math.floor(totalTime / 60);
  const secs = totalTime % 60;
  doc.text(`Total Time: ${mins}m ${secs}s`, margin, yPosition);
  yPosition += 7;
  
  const avgTime = (totalTime / questions.length).toFixed(1);
  doc.text(`Average Time: ${avgTime}s per question`, margin, yPosition);
  
  yPosition += 12;
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;
  
  // Questions and Answers
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Questions & Answers', margin, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  
  questions.forEach((q, index) => {
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = margin;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text(`Q${q.questionNumber}:`, margin, yPosition);
    
    doc.setFont('courier', 'normal');
    const questionText = q.numbers.map((num, idx) => {
      return idx > 0 ? ` ${q.operations[idx - 1]} ${num}` : num;
    }).join('');
    
    doc.text(questionText, margin + 15, yPosition);
    
    doc.setFont('helvetica', 'bold');
    doc.text(`= ${q.answer}`, margin + 15, yPosition + 5);
    
    yPosition += 12;
  });
  
  // Footer
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }
  
  return doc;
}

export function downloadExamResultsPDF(examData) {
  const doc = generateExamResultsPDF(examData);
  const filename = `abacus-exam-results-${Date.now()}.pdf`;
  doc.save(filename);
}
