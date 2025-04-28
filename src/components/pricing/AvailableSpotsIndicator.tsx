
interface AvailableSpotsIndicatorProps {
  availableSpots: number | null;
}

const AvailableSpotsIndicator = ({ availableSpots }: AvailableSpotsIndicatorProps) => {
  if (availableSpots === null) return null;
  
  return (
    <div className={`text-sm mb-4 p-2 rounded-md ${availableSpots < 20 ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
      <strong>{availableSpots}</strong> {availableSpots === 1 ? 'spot' : 'spots'} remaining out of 200
    </div>
  );
};

export default AvailableSpotsIndicator;
