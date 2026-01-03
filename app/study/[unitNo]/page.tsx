import StudyScreen from "@/components/screens/StudyScreen";

export default function Page({ params }: { params: { unitNo: string } }) {
  const unitNo = Number(params.unitNo);
  return <StudyScreen unitNo={unitNo} />;
}
