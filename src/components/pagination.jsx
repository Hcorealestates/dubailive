import { faChevronLeft, faChevronRight } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'


export default function Pagination({ totalrecord, pagename, currentpage, numberofpage }) {
	const numberofrecord = Array.from({ length: numberofpage }, (_, index) => index);

	let start_loop = '';
	let end_loop = '';
	if (parseInt(currentpage) >= parseInt(7)) {
		start_loop = parseInt(currentpage) - parseInt(3);
		if (parseInt(numberofpage) > (parseInt(currentpage) + parseInt(3))) {
			end_loop = parseInt(currentpage) + parseInt(3);
		} else if (parseInt(currentpage) <= parseInt(numberofpage) && parseInt(currentpage) > parseInt(numberofpage) - parseInt(6)) {
			start_loop = parseInt(numberofpage) - parseInt(6);
			end_loop = parseInt(numberofpage);
		} else {
			end_loop = parseInt(numberofpage);
		}
	} else {
		start_loop = parseInt(1);
		if (parseInt(numberofpage) > parseInt(7))
			end_loop = parseInt(7);
		else
			end_loop = parseInt(numberofpage);
	}
	const nextpageval = parseInt(currentpage) + parseInt(1);
	const prepageval = parseInt(currentpage) - parseInt(1);
	const nextpageUrl = "?page=" + nextpageval;
	const prevpageUrl = "?page=" + prepageval;
	return (
		<>
			<div className="flex items-center justify-center py-3">
				<nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
					<Link
						href={prevpageUrl}
						className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
					>
						<span className="sr-only" disabled>Previous</span>
						<FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" className="h-5 w-5" />
					</Link>
					{numberofrecord.map((data, idx) => {
						const pageval = idx + 1;
						const pageUrl = "?page=" + pageval;
						if (parseInt(currentpage) === parseInt(pageval)) {
							return (
								<Link
									href={pageUrl === '?page=1' ? pagename : pageUrl} key={idx}
									aria-current="page"
									className="relative z-10 inline-flex items-center bg-primary-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
								>
									{pageval}
								</Link>
							)
						} else if (pageval >= start_loop && pageval <= end_loop) {
							return (
								<Link
									href={pageUrl === '?page=1' ? pagename : pageUrl} key={idx}
									aria-current="page"
									className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
								>
									{pageval}
								</Link>
							)
						} else {

						}
					})}
					<Link
						href={nextpageUrl}
						className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
					>
						<span className="sr-only">Next</span>
						<FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className="h-5 w-5" />
					</Link>
				</nav>
			</div>
		</>
	)
}
