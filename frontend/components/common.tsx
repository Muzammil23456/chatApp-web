import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function Message(props: { msg: string; isOwnMessage: boolean }) {
  const { msg, isOwnMessage } = props;
  return <>{isOwnMessage ? <Outgoing msg={msg} /> : <Incoming msg={msg} />}</>;
}

export function Incoming(props: { msg: string }) {
  return (
    <div className="flex gap-2 justify-start">
      <Card
        className={` rounded-xl rounded-tl-none dark:bg-[#202c3330] max-w-[65%] border-none`}
      >
        <CardContent className="px-2 py-1">
          <p className="text-muted-foreground break-all">{props.msg}</p>
        </CardContent>
        <CardFooter className="py-1 px-2 justify-end">
          <p className="text-muted-foreground text-xs">12:00</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export function Outgoing(props: { msg: string }) {
  return (
    <div className="flex gap-2 justify-end">
      <Card
        className={` rounded-xl rounded-tr-none  bg-brand_1 justify-end max-w-[65%] border-none`}
      >
        <CardContent className="px-2 py-1">
          <p className="text-white break-all">{props.msg}</p>
        </CardContent>
        <CardFooter className="py-1 px-2 justify-end">
          <p className="text-white text-xs">12:00</p>
        </CardFooter>
      </Card>
    </div>
  );
}
