export const genderFontColor = (gender: string): React.CSSProperties => {
  switch (gender) { 
    case 'male':  
      return { color: 'blue' };
    
    case 'female':
      return { color: 'pink' };

    default:
      return { color: 'green' };
  }
};
  