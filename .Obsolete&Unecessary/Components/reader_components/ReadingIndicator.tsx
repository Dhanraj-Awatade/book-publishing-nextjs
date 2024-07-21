// import { Progress } from "@/components/ui/progress"
// import { useLayoutEffect, useState } from "react";

// const ReadingIndicator = ({ store }: any) => {

//     const [percentages, setPercentages] = useState(0);

//     const handleScroll = (e: Event) => {
//         const target = e.target;
//         if (target instanceof HTMLDivElement) {
//             const p = Math.floor((100 * target.scrollTop) / (target.scrollHeight - target.clientHeight));
//             setPercentages(Math.min(100, p));
//         }
//     };

//     const handlePagesContainer = () => {
//         const getPagesContainer = store.get('getPagesContainer');
//         if (!getPagesContainer) {
//             return;
//         }

//         const pagesEle = getPagesContainer();
//         pagesEle.addEventListener('scroll', handleScroll);
//     };

//     // useLayoutEffect(() => {
//     //     store.subscribe('getPagesContainer', handlePagesContainer);

//     //     return () => store.unsubscribe('getPagesContainer', handlePagesContainer);
//     // }, []);


//     return (
//         <Progress value={percentages} />
//     );
// };

// export default ReadingIndicator