import ResultScreen from "@/components/screens/ResultScreen";

export default function Page({ params }: { params: { unitNo: string } }) {
  const unitNo = Number(params.unitNo);
  return <ResultScreen unitNo={unitNo} />;
}
