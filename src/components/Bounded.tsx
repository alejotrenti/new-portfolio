import React from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType; // Permite cualquier tipo de elemento HTML o un componente React
  className?: string;
  style?: React.CSSProperties; // Agrega soporte para estilos en línea
  children: React.ReactNode;
};

const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
  ({ as: Comp = "section", className, style, children, ...restProps }, ref) => {
    return (
      <Comp
        ref={ref}
        className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)}
        style={style}
        {...restProps}
      >
        <div className="mx-auto w-full flex justify-center">{children}</div>
      </Comp>
    );
  },
);

Bounded.displayName = "Bounded";

export default Bounded;
