import React, { ReactNode } from 'react';
import cn from 'classnames';

type TColors =
  | 'black'
  | 'orange'
  | 'dark-blue'
  | 'blue'
  | 'yellow'
  | 'white'
  | 'red'
  | 'green'
  | 'purple';

interface ITypographyProps {
  variant: 'PageTitle' | 'Subtitle' | 'Paragraph' | 'InlineText';
  bold?: never;
  color?: TColors;
  children: ReactNode | ReactNode[];
}

interface ITypographyNonTitleProps {
  variant: 'Paragraph' | 'InlineText';
  bold?: boolean;
  color?: TColors;
  children: ReactNode | ReactNode[];
}

const Typography: React.FC<ITypographyProps | ITypographyNonTitleProps> = ({
  variant,
  bold,
  color,
  children,
}) => {
  let baseStyle = ['prose', 'prose-gray', 'font-notoSansTC'];
  if (bold) baseStyle.push('font-semibold');
  if (color) {
    baseStyle.splice(0, 2);
    baseStyle.push('text-' + color);
  }

  const concatedStyles = baseStyle.join(' ');

  switch (variant) {
    case 'PageTitle':
      baseStyle.push('font-bold');
      return (
        <h1 className={cn(concatedStyles, 'font-semibold')}>{children}</h1>
      );
    case 'Subtitle':
      return (
        <h2 className={cn(concatedStyles, 'font-semibold prose-lg')}>
          {children}
        </h2>
      );
    case 'Paragraph':
      return <p className={cn(concatedStyles)}>{children}</p>;
    case 'InlineText':
    default:
      return <span className={concatedStyles}>{children}</span>;
  }
};

export default Typography;
