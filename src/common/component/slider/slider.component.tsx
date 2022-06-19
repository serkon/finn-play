import React, { useEffect } from 'react';
import './slider.component.scss';

export interface SliderProps {
  start?: number;
  count: number;
  onClick?: (count: number) => void;
}

export const Slider = React.forwardRef<number, SliderProps>(({ start = 2, count, onClick, ...rest }, forwardedRef) => {
  const [steps, setSteps] = React.useState<number[]>([]);
  const [value, setValue] = React.useState<number>(count - 1);
  const [width, setWidth] = React.useState<number>(0);
  const handleClick = (value: number) => {
    setValue((_old) => {
      if (forwardedRef && typeof forwardedRef !== 'undefined') {
        (forwardedRef as any).current = value + start;
      }
      calculateWidth(value);
      return value;
    });
    onClick && onClick(value + start);
  };
  const calculateWidth = (value: number) => {
    const piece = count - 1 === 0 ? 1 : count - 1;
    const width = value > 0 ? (value * 100) / piece : 0;
    setWidth(width);
  };

  useEffect(() => {
    const steps = Array.from({ length: count }, (x, i) => start + i);
    setSteps(steps);
    calculateWidth(count - 1);
  }, [count, start]);

  return (
    <section className="steps-component" {...rest}>
      <div className="items">
        {steps.map((step, i) => (
          <div key={i} className={`item${i <= value ? ' selected' : ' '}`} onClick={() => handleClick(i)}>
            <span>{step}</span>
          </div>
        ))}
      </div>
      <div className="items-line-background" />
      <div className="items-line" style={{ width: width + '%' }} data-value={width} />
    </section>
  );
});
