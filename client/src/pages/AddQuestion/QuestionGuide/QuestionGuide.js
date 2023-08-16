import { QuestionGuideContainer } from './QuestionGuide.styled'

export default function QuestionGuide() {
  return (
    <QuestionGuideContainer>
      <h2>
        Writing a good question
      </h2>
      <p>
        You&apos;re ready to <span>ask</span> a <span>programming-related question</span> and this form will help guide you through the process.
      </p>
      <p>
        Looking to ask a non-programming question? See <span>the topics here</span> to find a relevant site.
      </p>
      <h5>Steps</h5>
      <ul>
        <li>
          Summarize your problem in a one-line title.
        </li>
        <li>
          Describe your problem in more detail.
        </li>
        <li>
          Describe what you tried and what you expected to happen.
        </li>
        <li>
          Add &quot;tags&quot; which help surface your question to members of the community.
        </li>
        <li>
          Review your question and post it to the site.
        </li>
      </ul>
    </QuestionGuideContainer>
  )
}