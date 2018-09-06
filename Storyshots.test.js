import initStoryshots, {
	getSnapshotFileName
} from '@storybook/addon-storyshots'
import 'jest-styled-components'
import { render as renderer, configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import serializer from "enzyme-to-json"
import { styleSheetSerializer } from "jest-styled-components/serializer"
import { addSerializer } from "jest-specific-snapshot"

addSerializer(styleSheetSerializer)

configure({ adapter: new Adapter() })

// Using this function means we'll see the change in the css in the snapshot
// diff instead of just the change in classname
const styledSnapshot = ({ story, context }) => {
  const snapshotFileName = getSnapshotFileName(context)
  const storyElement = story.render(context)
  const tree = renderer(storyElement)
  const serializedTree = serializer(tree)

  expect(serializedTree).toMatchSpecificSnapshot(snapshotFileName)
}

initStoryshots({
  test: styledSnapshot
})
