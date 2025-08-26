import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const AlternativeBox = ({ alternative }) => {
  return (
	<div className='flex flex-col justify-between rounded-[22px] bg-white p-6 shadow-fb-one duration-300 hover:shadow-[0px_20px_70px_-32px_rgba(107,110,148,0.06)] sm:p-7.5 md:p-6 xl:p-7.5'>
	  <div className='mb-6 flex items-center border-b border-fb-stroke pb-6'>
		<div className='mr-6 flex aspect-square w-[70px] items-center justify-center rounded-full border border-fb-gray-2 bg-fb-gray'>
		  <Image
			src={alternative.logo}
			alt={'Logo for ' + alternative.title}
			className="object-contain"
			width={32}
			height={32}
		  />
		</div>

		<div>
		  <h3 className='mb-1 font-heading text-lg font-bold text-black'>
			{alternative.title}
		  </h3>

		  <p className='text-sm text-body-color'>
			{alternative.title} vs FormBold
		  </p>
		</div>
	  </div>

	  <p className='mb-[30px] text-sm leading-[24px] text-body-color'>
		{alternative.desc}
	  </p>


	  <Link
		href={`/alternatives/${alternative.path}`}
		className='inline-block max-w-fit rounded-3xl border border-fb-gray-3 bg-white px-7 py-2.5 font-heading text-base font-medium text-black duration-300 hover:border-primary hover:text-primary'
	  >
		View Comparison
	  </Link>
	</div>
  );
};

export default AlternativeBox;
