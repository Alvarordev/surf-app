export const getCardinal = (angle: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions[Math.round(angle / 45) % 8]
}

export const getWindShore = (angle: number) => {
  const directions = ['Onshore', 'Cross-shore', 'Offshore']

  if (angle >= 20 && angle <= 110) {
    return directions[2] // Offshore
  } else if ((angle >= 160 && angle <= 200) || angle >= 340 || angle <= 20) {
    return directions[0] // Onshore
  } else {
    return directions[1] // Cross-shore
  }
}
