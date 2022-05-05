import { Accommodation } from '@interfaces/accommodation'

export function addAverageRatingToAccommodation(accommodation: Accommodation) {
  if (!accommodation.reviews) {
    return accommodation
  }

  const rating = accommodation.reviews.reduce((acc, review) => acc + review.rating, 0) / accommodation.reviews.length

  return {
    ...accommodation,
    rating: isNaN(rating) ? 0 : rating,
  }
}

export function addAverageRatingToAccommodations(accommodations: Accommodation[]) {
  return accommodations.map(accommodation => {
    if (!accommodation.reviews) {
      return accommodation
    }

    const rating = accommodation.reviews.reduce((sum, review) => sum + review.rating, 0) / accommodation.reviews.length

    return {
      ...accommodation,
      rating: isNaN(rating) ? 0 : rating,
    }
  })
}
