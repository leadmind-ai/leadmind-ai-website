type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
