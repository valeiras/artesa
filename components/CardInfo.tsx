function CardInfo({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex gap-x-2 items-center my-2">
      {icon}
      {text}
    </div>
  );
}
export default CardInfo;
