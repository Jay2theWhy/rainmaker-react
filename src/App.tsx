import RainEffect from './components/RainEffect';
import { SettingsPanel } from './components/SettingsPanel';

const App: React.FC = () => {
    return (
        <div>
            <SettingsPanel />
            <RainEffect />
        </div>
    );
};

export default App;
