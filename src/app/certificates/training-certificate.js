import Image from "next/image"
import { Building, BookOpen } from "lucide-react"

export const TrainingCertificate = ({ formData, image, pronouns }) => {
  return (
    <>
      {/* Certificate header with gradient */}
      <div className="absolute top-0 left-0 w-full h-[80px] bg-gradient-to-r from-green-50 to-emerald-50"></div>

      {/* Image and date */}
      <div className="h-[15%] pt-10 w-full flex justify-between relative z-10">
        <div className="h-full">
          {image ? (
            <div className="relative w-[28mm] h-[28mm]">
              <Image
                fill
                src={image || "/placeholder.svg"}
                alt="Company Logo"
                className="rounded-full object-cover border-2 border-green-100 shadow-md"
              />
            </div>
          ) : (
            <div className="w-[18mm] h-[18mm] border-2 border-green-200 rounded-full flex items-center justify-center bg-gray-50 shadow-md">
              <Building size={24} className="text-green-300" />
            </div>
          )}
        </div>
        <div className="flex items-end pb-4">
          <p className="text-xs font-medium text-gray-600">Date: {formData.date || "___________"}</p>
        </div>
      </div>

      {/* Certificate content */}
      <div className="flex flex-col gap-6 mt-4 text-sm items-center">
        <h2 className="text-center font-bold text-2xl text-green-800 border-b-2 border-green-200 pb-2 w-fit mx-auto px-4">
          Certificate of Training
        </h2>

        <div className="flex items-center justify-center w-16 h-16 bg-green-50 rounded-full border-2 border-green-200 mb-2">
          <BookOpen size={32} className="text-green-500" />
        </div>

        <p className="text-center text-lg font-medium">This is to certify that</p>

        <h3 className="text-center text-2xl font-bold text-green-700 my-2">
          {formData.employeeName || "[Employee Name]"}
        </h3>

        <p className="text-center text-lg">has successfully completed the training on</p>

        <h3 className="text-center text-xl font-bold text-green-700 my-2 px-4 py-2 border-2 border-green-200 rounded-lg bg-green-50">
          {formData.trainingName || "[Training Name]"}
        </h3>

        <p className="text-center text-base">
          for a duration of <span className="font-medium">{formData.duration || "[Duration]"}</span>
        </p>

        <p className="text-center text-base max-w-2xl mt-4">
          During the training, {pronouns.subject} demonstrated great enthusiasm and acquired valuable skills that will
          contribute to {pronouns.possessive} professional growth and the success of our organization.
        </p>
      </div>

      <div className="mt-16 flex flex-col w-full">
        <div className="flex justify-between w-full px-8">
          <div className="flex flex-col items-center">
            <div className="h-[100px]"></div>
            <div className="w-40 border-t border-gray-300 pt-2">
              <p className="text-black text-center text-sm">Authorizer Signature</p>
            </div>
            <p className="font-medium mt-1 text-center">{formData.authorizer || "[Authorizer Name]"}</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-[100px]"></div>
            <div className="w-40 border-t border-gray-300 pt-2">
              <p className="text-black text-center text-sm">Company Stamp</p>
            </div>
            <p className="font-medium mt-1 text-center">{formData.companyName || "[Company Name]"}</p>
          </div>
        </div>
      </div>

      {/* Certificate footer with gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-r from-green-50 to-emerald-50"></div>
    </>
  )
}
