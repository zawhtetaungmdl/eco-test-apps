import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  active?: 'home' | 'stats' | 'profile';
}

export default function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate();

  const getButtonClass = (name: string) => {
    const isActive = active === name;
    // Base classes
    let iconClass = "material-symbols-outlined transition-colors ";
    let textClass = "text-[10px] font-medium transition-colors ";

    if (isActive) {
        iconClass += "text-forest dark:text-white fill-1"; // Assuming fill-1 makes it filled if variable font, or use filled icon
        textClass += "text-forest dark:text-white";
    } else {
        iconClass += "text-gray-400 dark:text-gray-500 group-hover:text-forest dark:hover:text-white";
        textClass += "text-gray-400 dark:text-gray-500 group-hover:text-forest";
    }

    return { iconClass, textClass };
  };

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-white/90 dark:bg-[#112111]/90 backdrop-blur-md border-t border-gray-200 dark:border-white/10 pb-safe pt-2">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center justify-center w-full h-full gap-1 group"
        >
          <span className={getButtonClass('home').iconClass}>home</span>
          <span className={getButtonClass('home').textClass}>Home</span>
        </button>
        <button
            onClick={() => navigate('/stats')}
            className="flex flex-col items-center justify-center w-full h-full gap-1 group"
        >
          <span className={getButtonClass('stats').iconClass}>bar_chart</span>
          <span className={getButtonClass('stats').textClass}>Stats</span>
        </button>
        <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center justify-center w-full h-full gap-1 group"
        >
          <span className={getButtonClass('profile').iconClass}>person</span>
          <span className={getButtonClass('profile').textClass}>Profile</span>
        </button>
      </div>
    </nav>
  );
}
