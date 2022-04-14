// import CardDestination from './RutaTop'
// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import { rutaTop } from '../../Redux/actions/actions'



// export default function Top(){

//     const cities = useSelector(state => state.destination)
//     const dispatch = useDispatch()
//     const cityname = cities.data.map(p => p.name)
//     const rank = cities.data.map(p => p.global_rank_dst)
//     console.log('cities',cities)

//     useEffect(() => {
//         dispatch(rutaTop())
//     }, [])

//     return(
//         <div>
           
//             <CardDestination rank={rank[0]} img={top} value='orlando' city={cityname[0]} price='500'/>
//          <CardDestination rank={rank[1]} img={top1} value='new york' city={cityname[1]} price='500'/>
//        {/* <CardDestination rank={rank[2]} img={top2} value='miami' city={cityname[2]} price='500'/>
//         <CardDestination rank={rank[3]} img={top3} value='las vegas' city={cityname[3]} price='500'/>
//         <CardDestination rank={rank[4]} img={top4} value='san francisco' city={cityname[4]} price='500'/>
//         <CardDestination rank={rank[5]} img={top5} value='los angeles' city={cityname[5]} price='500'/>
//         <CardDestination rank={rank[6]} img={top6} value='atlanta' city={cityname[6]} price='500'/>
//         <CardDestination rank={rank[7]} img={top7} value='cancun' city={cityname[7]} price='500'/> */}
        
//         </div>
//     )
// }