import { Button, type ButtonProps } from '@radix-ui/themes'
import type { Topic } from '../hooks/useTopics'

type Props = {
    topics: Topic[],
    onTopicChange: (t: Topic) => void
    getVaritant: (t: Topic) => ButtonProps["variant"]
    buttonProps?: ButtonProps
}

const Topics: React.FC<Props> = ({onTopicChange, topics, getVaritant, buttonProps}) => {
  return (
    topics?.map(t => (
          <Button
            key={t.title}
            onClick={() => onTopicChange(t)}
            variant={getVaritant(t)}
            {...buttonProps}
          >
            {t.title}
          </Button>
        ))
  )
}

export default Topics