import { cn } from "@/lib/utils";
import { PlateElement, PlateElementProps } from "@udecode/plate-common";

const ParagraphElement = ({
  className,
  children,
  ...props
}: PlateElementProps) => {
  return (
    <PlateElement
      {...props}
      className={cn(className, "leading-7 [&:not(:first-child)]:mt-6")}
      asChild
    >
      <p>{children}</p>
    </PlateElement>
  );
};

export default ParagraphElement;
