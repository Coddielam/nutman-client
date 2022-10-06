import React, { ReactNode } from 'react';

interface ITypographyProps {
  variant: 'PageTitle' | 'Subtitle' | 'Paragraph' | 'InlineText';
  bold?: never;
  children: ReactNode | ReactNode[];
}

interface ITypographyNonTitleProps {
  variant: 'Paragraph' | 'InlineText';
  bold?: boolean;
  children: ReactNode | ReactNode[];
}

const Typography: React.FC<ITypographyProps | ITypographyNonTitleProps> = ({
  variant,
  bold,
  children,
}) => {
  let baseStyle = 'prose prose-gray font-sans';
  if (bold) baseStyle += ' font-semibold';

  switch (variant) {
    case 'PageTitle':
      baseStyle += ' font-bold';
      return (
        <h1 className={`${baseStyle} prose-xl font-semibold`}>{children}</h1>
      );
    case 'Subtitle':
      baseStyle += ' font-semibold';
      return <h2 className={`${baseStyle} prose-lg`}>{children}</h2>;
    case 'Paragraph':
      return <p className={`${baseStyle}`}>{children}</p>;
    case 'InlineText':
    default:
      return <span className={`${baseStyle}`}>{children}</span>;
  }
};

export default Typography;
