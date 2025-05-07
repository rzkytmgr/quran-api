import { jsonResolver } from '../utils/_utils.js';
const getEntireRecitersService = async () => {
    const getReciters = await jsonResolver('EntireReciters');
    return getReciters;
};
const getSpesificReciterService = async (reciterId) => {
    const getReciters = await getEntireRecitersService();
    const getOneReciter = (new Map(getReciters.map((reciter) => [reciter.id, reciter]))).get(reciterId);
    return getOneReciter;
};
export { getEntireRecitersService, getSpesificReciterService, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjaXRlci5zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9yZWNpdGVyLnNlcnZpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHNUMsTUFBTSx3QkFBd0IsR0FBRyxLQUFLLElBQUksRUFBRTtJQUMxQyxNQUFNLFdBQVcsR0FBRyxNQUFNLFlBQVksQ0FBaUIsZ0JBQWdCLENBQUMsQ0FBQztJQUN6RSxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDLENBQUM7QUFFRixNQUFNLHlCQUF5QixHQUFHLEtBQUssRUFBRSxTQUFpQixFQUFFLEVBQUU7SUFDNUQsTUFBTSxXQUFXLEdBQUcsTUFBTSx3QkFBd0IsRUFBRSxDQUFDO0lBQ3JELE1BQU0sYUFBYSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwRyxPQUFPLGFBQWEsQ0FBQztBQUN2QixDQUFDLENBQUM7QUFFRixPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLHlCQUF5QixHQUMxQixDQUFDIn0=