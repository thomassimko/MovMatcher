import React from 'react';

const Loader = () => {
  const circleCommonClasses = 'h-5 w-5 bg-red-400 rounded-full';

  return (
    <div className="flex justify-center mt-12">
      <div className={`${circleCommonClasses} mr-2 animate-bounce`} />
      <div className={`${circleCommonClasses} mr-2 animate-bounce200`} />
      <div className={`${circleCommonClasses} animate-bounce400`} />
    </div>
  );
};

export default Loader;
