import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
export const Toast = (props: any) => {
  const { title, detail } = props;
  const { toast } = useToast();
  useEffect(() => {
    if (title !== "") {
      (() => {
        toast({
          variant:
            title == "Error"
              ? "destructive"
              : title == "Success"
              ? "success"
              : "default",
          title,
          description: detail,
          duration: 6000,
        
          onSwipeMove(event) {
                props.handleToast("")
          },
          onEscapeKeyDown(event) {
            props.handleToast("")
          },
        });
      })();
      const interval = setInterval(() => props.handleToast(""), 6000);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, detail]);

  return <></>;
};
