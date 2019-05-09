import { triggerStageBarChanged } from '../events'
import changesFromObjects from '../lib/changesFromObjects'
import getStateBarsFromContainer from '../lib/getStateBarsFromContainer'
import isRootPipelinesPage from '../lib/isRootPipelinesPage'

if (!isRootPipelinesPage()) {
    const stateBarsByName$ = changesFromObjects(
        getStateBarsFromContainer,
        stage => stage.name,
        (left, right) => left.state === right.state
    )

    stateBarsByName$.forEach(g => {
        g.subscribe(s => {
            triggerStageBarChanged(s)
        })
    })
}
