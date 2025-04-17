import { PageLayout } from "@/components/page-layout.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";

const Help = () => {
  return (
    <PageLayout
      title="View help information"
      description="See information on how to play"
      showMarketStatus={false}
    >
      <Card className="pt-6 flex flex-col">
        <CardContent className="flex flex-col gap-y-4">
          <h1 className="text-lg font-bold">What is Free Market Fandango?</h1>
          <p>
            Free Market Fandango is an interactive party night. You should have
            recieved a card, which you can use to make purchases on the market.
            The stocks are drinks, which change price according to market
            demands. Their prices will also be affected by news events, which we
            will bring to you live throughout the night.
          </p>
        </CardContent>
        <Separator className="mb-4" />
        <CardContent className="flex flex-col gap-y-4">
          <h1 className="text-lg font-bold">Do I need to pay real money?</h1>
          <p>
            <strong>No!</strong> Your card is loaded with fictional money, you
            don't need to pay real money to play.
          </p>
        </CardContent>
        <Separator className="mb-4" />
        <CardContent className="flex flex-col gap-y-4">
          <h1 className="text-lg font-bold">
            How did you build Free Market Fandango?
          </h1>
          <p>
            You probably don't care but the website you are using now is a React
            app, it connects to the Free Market Fandango API which is a
            collection of Lambda functions behind API Gateway, running on AWS. A
            few other Lambda functions run on a regular basis to modify prices
            and pick new events to run.
          </p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Help;
