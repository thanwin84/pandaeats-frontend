

type Props = {
  className?: string
  ariaLabel: string
  icon: React.ReactNode,
  text: string
};

export default function DeliveryInfo({
    className, 
    ariaLabel,
    icon, 
    text}: Props) {
  return (
    <span className={`flex gap-4 text-nowrap ${ariaLabel.includes('time')? "text-green-500": ""} ${className}`} aria-label={ariaLabel} >
        <span aria-hidden={true}>{icon}</span>
        {text}
    </span>
  );
}