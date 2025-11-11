

import LangWithFlag from "./LangWithFlag";
import {zip} from "@/utils";
import { Table, Header, Card } from "@/components";

interface table_data{
    language: string[],
    probability: number[]
}
interface ResultProps{
    text:string
    language: string,
    plot_data: string,
    data: {
        language: string[],
        probability: number[]
},
}




function Result({text, language, plot_data, data}:ResultProps){
    return (
    <div className="mt-5 w-full">
    <Card>
      <Header>
           <div className="flex items-center justify-center gap-2">
              <div className="text-3xl text-[var(--A-50)]"> Vorhersage </div>
              <LangWithFlag language={language} svg_width={32} text_class="text-3xl" />
            </div>
      </Header>
        <p className="!italic text-center text-xl text-[var(--A-50)]">„{text}“</p>
      </Card>

        <div className="mt-5 justify-start w-full flex flex-col-reverse xl:flex-row">
            <Card>
              <PredictionTable data={data} />
            </Card>
            <div className="w-10 h-10"></div>
            <Card>
              <img className="object-contain" src={`data:image/png;base64,${plot_data}`} />
            </Card> 
        </div>
      </div>
    )
}

const PredictionTable: React.FC<{data: table_data}> =({data})=>{
    return (
<div className="overflow-auto mt-10">
  <Table>
    <Table.Head className="text-xs uppercase bg-[var(--A-700)] ">
        <Table.HEntry className="w-1/2"> Sprache </Table.HEntry>
        <Table.HEntry> Wahrscheinlichkeit (in %) </Table.HEntry>

    </Table.Head>
    <Table.Body>
      {
          [...zip(data.language, data.probability)]
            .filter((x)=> x[1] > 0.0)
            .sort((a,b) =>b[1] - a[1])
            .slice(0,10)
            .map((value, index) => (
              <Table.Row key={index}>
                <Table.Entry >
                    <LangWithFlag language={value[0]} svg_width={16} />
                </Table.Entry>
                <Table.Entry className="px-4 py-2 whitespace-normal break-words">
                    {(value[1]*100).toFixed(2)}
                </Table.Entry>

              </Table.Row>
            ))
      }
    </Table.Body>
  </Table>
        </div>

    )
}
export default Result;