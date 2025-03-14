import { ValuesToType } from '@types';

import DocxIcon from '@assests/icon/docxFormat.svg';
import DocIcon from '@assests/icon/docFormat.svg';
import PdfIcon from '@assests/icon/pdfFormat.svg';

export const ATTACHMENT_FORMAT_ICON = {
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
} as const;

export type AttachmentType = ValuesToType<typeof ATTACHMENT_FORMAT_ICON>;

export const ATTACHMENT_ICON_MAP: Record<AttachmentType, string> = {
  [ATTACHMENT_FORMAT_ICON.DOCX]: DocxIcon,
  [ATTACHMENT_FORMAT_ICON.DOC]: DocIcon,
  [ATTACHMENT_FORMAT_ICON.PDF]: PdfIcon,
};

export const ATTACHMENTS_TYPE_MAP: Record<string, string> = {
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'DOCX',
};
