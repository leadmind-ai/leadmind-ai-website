type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-6 md:px-12 lg:px-20 xl:px-28 ${className}`}>
      {children}
    </div>
  );
}
