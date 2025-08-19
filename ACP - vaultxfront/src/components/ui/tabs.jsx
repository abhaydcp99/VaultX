import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      {...rest}
    />
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible-none focus-visible-2 focus-visible-ring focus-visible-offset-2 disabled-events-none disabled-50 data-[state=active]-background data-[state=active]-foreground data-[state=active]-sm",
        className
      )}
      {...rest}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible-none focus-visible-2 focus-visible-ring focus-visible-offset-2",
        className
      )}
      {...rest}
    />
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
