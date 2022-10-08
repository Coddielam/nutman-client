import React, { ReactNode } from 'react';
const myconfig = require('@root/tailwind.config');

interface ITypographyProps {
  variant: 'PageTitle' | 'Subtitle' | 'Paragraph' | 'InlineText';
  bold?: never;
  color?: 'black' | 'orange' | 'dark-blue' | 'blue' | 'yellow' | 'white';
  children: ReactNode | ReactNode[];
}

interface ITypographyNonTitleProps {
  variant: 'Paragraph' | 'InlineText';
  bold?: boolean;
  color?: 'black' | 'orange' | 'dark-blue' | 'blue' | 'yellow' | 'white';
  children: ReactNode | ReactNode[];
}

const Typography: React.FC<ITypographyProps | ITypographyNonTitleProps> = ({
  variant,
  bold,
  color,
  children,
}) => {
  let baseStyle = 'prose prose-gray font-sans';
  if (bold) baseStyle += ' font-semibold';
  if (color) baseStyle += ` text-${color}`;

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
