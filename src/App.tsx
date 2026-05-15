import './App.css'
import { StepAndRepeat } from './components/StepAndRepeat'

const patternTile = <div className="tile">Logo</div>

function App() {
  return (
    <main className="app-shell">
      <section className="intro">
        <p className="eyebrow">Reusable React layout primitive</p>
        <h1>Step-and-repeat pattern with staggered rows</h1>
        <p className="lede">
          The child element is measured once, then repeated to fill the container. Every
          other row shifts by half of the child width on the x axis.
        </p>
      </section>

      <section className="demo-frame">
        <StepAndRepeat
          gap={20}
          animate
          speed={7}
          alternateDirection
          rotation={-15}
          className="pattern-surface"
        >
          {patternTile}
        </StepAndRepeat>
      </section>
    </main>
  )
}

export default App
