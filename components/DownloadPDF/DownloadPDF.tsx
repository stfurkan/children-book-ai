import { useState } from "react";
import { jsPDF } from "jspdf";
import { useTranslations } from 'next-intl';
import { FileDown } from "lucide-react";
import { AuthorType, BookType, PageType } from '@/types/dbTypes';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const t = useTranslations('BookTitle');

  const [isLoading, setIsLoading] = useState(false);

  const generatePDF = () => {
    setIsLoading(true);
    setTimeout(() => {
      const doc = new jsPDF({
        unit: "in",
        format: [6, 9]
      });

      const margins = { top: 0.375, left: 0.375, right: 0.375, bottom: 0.375 };

      // Initially, check if a cover image exists and handle it
      if (book.book.image) {
        doc.addImage(book.book.image, 'JPEG', 1, margins.top, 4, 4); // Cover image fills the whole page
        doc.setFontSize(24); // Larger font for the title
        // doc.setTextColor(255, 255, 255); // Assuming white text, adjust as needed for visibility
        doc.text(book.book.title, 3, 5, {
          maxWidth: 6 - margins.left - margins.right,
          align: 'center'
        }); // Center title at the bottom of the cover image
        doc.setFontSize(18); // Smaller font for the author
        doc.text(book.author.authorName, 3, 5.5, {
          maxWidth: 6 - margins.left - margins.right,
          align: 'center'
        }); // Center title at the top of the page
      } else {
        doc.setFontSize(24); // Larger font for the title
        doc.text(book.book.title, 3, 2.75, {
          maxWidth: 6 - margins.left - margins.right,
          align: 'center'
        }); // Center title at the top of the page
        doc.setFontSize(18); // Smaller font for the author
        doc.text(book.author.authorName, 3, 3.25, {
          maxWidth: 6 - margins.left - margins.right,
          align: 'center'
        }); // Center title at the top of the page
      }
      doc.setFontSize(12); // Reset font size for content
      doc.text("This book was created using childrensbookai.net.", 3, 8.75, { align: 'center' });
      doc.addPage(); // Ensures first page is not empty and cover doesn't get overwritten

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
        // doc.setTextColor(0, 0, 0); // Reset text color to black for content
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
      doc.setFontSize(18);
      doc.text("About the Author", 3, 1, { align: 'center' });
      doc.setFontSize(14);
      doc.text(book.author.authorName, 3, 1.5, { align: 'center' });
      doc.setFontSize(12);

      // Optionally add the author's image to the left of the bio
      if (book.author.image) {
        const imageSize = 1.5; // Smaller image for the author
        doc.addImage(book.author.image, 'JPEG', margins.left, 2, imageSize, imageSize);
        // Adjust the starting point of the bio text
        doc.text(book.author.bio, margins.left + imageSize + 0.5, 2.1, {
          maxWidth: 6 - margins.left - margins.right - imageSize - 0.5,
          align: 'left'
        });
      } else {
        doc.text(book.author.bio, margins.left, 2, {
          maxWidth: 6 - margins.left - margins.right,
          align: 'left'
        });
      }

      doc.text("This book was created using childrensbookai.net.", 3, 8.75, { align: 'center' });

      doc.save(`${book.book.title}.pdf`);
      setIsLoading(false);
    }, 10);
  }

  return (
    <>
      <Button onClick={() => generatePDF()}>
        {t('DownloadPDF.button')} <FileDown className="ml-2 w-5 h-5" />
      </Button>
      <AlertDialog open={isLoading}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t('DownloadPDF.alert.title')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('DownloadPDF.alert.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
