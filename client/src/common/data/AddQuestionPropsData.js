const inputGuideProps = {
  title: {
    title: 'Writing a good title',
    body: [
      "Your title should summarize the problem.",
      "You might find that you have a better idea of your title after writing out the rest of the question"
    ]
  },
  body: {
    title: 'Introduce the problem',
    body: [
      "Explain how you encountered the problem you're trying to solve, and any difficulties that have prevented you from solving it yourself.",
      "Show what you've tried, tell us what happened, and why it didn't meet your needs."
    ]
  },
  tag: {
    title: "Adding Tags",
    body: [
      "Tags help ensure that your question will get attention from the right people.",
      "Tag things in more than one way so people can find them easily. Add tags for product lines, projects, teams, and the specific technologies or languages used."
    ]
  }
};

const inputFormProps = {
  title: {
    label: "title",
    formTitle: "Title",
    formInfo: "Be specific and imagine you're asking a question to another person.",
    formType: "text",
    placeholder: "e.g. Is there an R function for finding the index of an element in a vector?",
  },
  body: {
    label: "body",
    formTitle: "What did you try and what were you expecting?",
    formInfo: "Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters.",
    formType: "editor",
    placeholder: "",
  },
  tag: {
    label: "tag",
    formTitle: "Tags",
    formInfo: "Add up to 5 tags to describe what your question is about. Press Enter or use a comma to register a tag.",
    formType: "text",
    placeholder: "e.g. (vba css mysql)",
  },
};

export { inputGuideProps, inputFormProps };
