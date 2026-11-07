interface InfoSectionProps {
  infoMessage: string | null;
}

function InfoSection({ infoMessage }: InfoSectionProps) {
  return (
    <div>
      <p>{infoMessage ? infoMessage : "Let's manage your closet!"}</p>
    </div>
  );
}

export default InfoSection;
