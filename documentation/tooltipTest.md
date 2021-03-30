
<!--
return (
    <SCodepedia
      concept={concept}
      language={language}
      linkOverrides={{
        label: `Jump to ${name}`,
        onLoad: async () => entry?.mdBody || "",
        onViewClick: () => navigateToEntry(navigate, entry),
      }}
      align="left"
      verticalOffset={5}
    >
      {children as any}
    </SCodepedia>
  );
};
-->
