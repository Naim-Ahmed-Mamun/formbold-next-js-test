import Image from 'next/image';
import Link from 'next/link';
import MarkdownContainer from '../../../../../components/MarkdownContainer';

export default function AlternativeDetailsMain({ post }) {
  return (
	<section className='pb-20 pt-24 sm:pt-32 md:pb-28 lg:pt-[140px]'>
	  <div className='container'>
		<div className='mx-auto w-full max-w-[770px]'>
		  <div className='mx-auto w-full max-w-[600px]'>
			<div className='mx-auto mb-10 flex w-full max-w-[280px] items-center justify-between rounded-[80px] border border-fb-gray-2 bg-fb-gray p-4'>
			  <div className='flex aspect-square w-[90px] items-center justify-center rounded-full bg-white shadow-fb-one'>
				<svg
				  width='34'
				  height='34'
				  viewBox='0 0 34 34'
				  fill='none'
				  xmlns='http://www.w3.org/2000/svg'
				>
				  <path
					d='M34 0V34H13.118V27.0902H27.5478V20.3634H13.118V13.7281H27.5478V7.09287H6.54374V34H0V0H34Z'
					fill='#5750F1'
				  />
				</svg>
			  </div>
			  <div>
				<svg
				  width='24'
				  height='24'
				  viewBox='0 0 71 70'
				  fill='none'
				  xmlns='http://www.w3.org/2000/svg'
				>
				  <path
					d='M19.6364 0.181824L35.25 51.3182H35.8295L51.4432 0.181824H70.3295L46.7727 70H24.3068L0.75 0.181824H19.6364Z'
					fill='black'
				  />
				</svg>
			  </div>
			  <div className='relative flex aspect-square w-[90px] items-center justify-center rounded-full bg-white shadow-fb-one'>
				<Image
				  src={`${post?.icon}`}
				  alt='icon'
				  fill
				  className='aspect-square scale-[55%] object-contain'
				/>
			  </div>
			</div>

			<div className='mb-20 text-center'>
			  <h1 className='mb-4 font-heading text-2xl font-black text-black sm:text-4xl md:text-[40px]/[48px]'>
				{post?.heading}
			  </h1>
			  <p className='text-base text-body-color'>{post?.subheading}</p>
			</div>
		  </div>

		  <MarkdownContainer content={post?.content} />

		  <div className='relative z-10 mt-[60px] overflow-hidden rounded-[22px] bg-black px-6 py-9 sm:px-6 md:px-9'>
			<div className='-mx-3 flex flex-wrap items-center justify-between lg:flex-nowrap'>
			  <div className='w-full px-3 lg:max-w-[312px]'>
				<div className='mb-8 lg:mb-0'>
				  <h2 className='font-heading text-2xl font-bold text-white text-balance'>
					Start building automated serverless forms
				  </h2>
				</div>
			  </div>
			  <div className='w-full px-3'>
				<div className='items-center sm:flex lg:justify-end'>

				  <Link
					href='/pricing'
					className='inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 font-heading text-base font-medium text-white duration-300 hover:bg-fb-primary-hover'
				  >
					Try FormBold Free <span className='pl-2'>→</span>
				  </Link>
				</div>
			  </div>
			</div>

			<div className="absolute left-0 top-0 -z-10 h-full w-full bg-[url('/cta/bg.svg')] bg-cover bg-center"></div>
		  </div>
		</div>
	  </div>
	</section>
  );
}
