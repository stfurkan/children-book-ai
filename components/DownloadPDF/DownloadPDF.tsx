import { jsPDF } from "jspdf";
import { FileDown } from "lucide-react";
import { AuthorType, BookType, PageType } from '@/types/dbTypes';
import { Button } from '@/components/ui/button';

export function DownloadPDF(
  {
    book,
  }: {
    book: {
      author: AuthorType;
      book: BookType;
      pages: PageType[];
    };
  }
) {

  const generatePDF = () => {
    const doc = new jsPDF({
      unit: "in",
      format: [6, 9]
    });

    const margins = { top: 0.375, left: 0.375, right: 0.375, bottom: 0.375 };

    // Initially, check if a cover image exists and handle it
    if (book.book.image) {
      doc.addImage(book.book.image, 'JPEG', 0, 0, 6, 9); // Cover image fills the whole page
      doc.setFontSize(24); // Larger font for the title
      doc.setTextColor(255, 255, 255); // Assuming white text, adjust as needed for visibility
      doc.text(book.book.title, 3, 8.5, { align: 'center' }); // Center title at the bottom of the cover image
      doc.addPage(); // Ensures first page is not empty and cover doesn't get overwritten
    } else {
      doc.setFontSize(24); // Larger font for the title
      doc.text(book.book.title, 3, 0.75, { align: 'center' }); // Center title at the top of the page
    }

    // Iterate through book pages
    book.pages.forEach((page, index) => {
      if (index !== 0 || book.book.image) doc.addPage();

      let contentY = margins.top; // Start content at the top margin

      if (page.image) {
        // If there is an image, place it centered at the top of the page
        const imageSize = 4; // Square image, 4 inches on each side
        doc.addImage(page.image, 'JPEG', (6 - imageSize) / 2, contentY, imageSize, imageSize);
        contentY += imageSize + 0.5; // Adjust text start position below the image
      } else {
        contentY = 4.5; // Center text vertically
      }

      // Add text below the image, centered
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Reset text color to black for content
      doc.text(page.content, 3, contentY, {
        maxWidth: 6 - margins.left - margins.right,
        align: 'center'
      });

      // Add page number at the bottom center, except on the cover page
      doc.setFontSize(10);
      doc.text(`${index + 1}`, 3, 8.75, { align: 'center' });
    });

    // Add the back cover with author's bio, centered
    doc.addPage();
    doc.setFontSize(10);
    doc.text("About the Author", 3, 1, { align: 'center' });

    // Optionally add the author's image to the left of the bio
    if (book.author.image) {
      const imageSize = 1.5; // Smaller image for the author
      doc.addImage(book.author.image, 'JPEG', margins.left, 1.5, imageSize, imageSize);
      // Adjust the starting point of the bio text
      doc.text(book.author.bio, margins.left + imageSize + 0.5, 1.6, {
        maxWidth: 6 - margins.left - margins.right - imageSize - 0.5,
        align: 'left'
      });
    } else {
      doc.text(book.author.bio, margins.left, 1.5, {
        maxWidth: 6 - margins.left - margins.right,
        align: 'left'
      });
    }

    doc.text("This book was created using childrensbookai.net.", 3, 8.75, { align: 'center' });

    doc.save(`${book.book.title}.pdf`);
  }

  return (
    <Button onClick={generatePDF}>
      Download Book <FileDown className="ml-2 w-5 h-5" />
    </Button>
  );
}
