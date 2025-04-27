import Image from "next/image"
import { Building } from "lucide-react"

export const EmploymentCertificate = ({ formData, image, pronouns }) => {
  return (
    <>
      {/* Certificate header with gradient */}
      <div className="absolute top-0 left-0 w-full h-[50px] bg-gradient-to-r from-blue-50 to-violet-50"></div>

      {/* Image and date */}
      <div className="h-[15%] pt-10 w-full flex justify-between relative z-10">
        <div className="h-full">
          {image ? (
            <div className="relative w-[28mm] h-[28mm]">
              <Image
                fill
                src={image || "/placeholder.svg"}
                alt="Company Logo"
                className="rounded-full object-cover border-2 border-blue-100 shadow-md"
              />
            </div>
          ) : (
            <div className="w-[18mm] h-[18mm] border-2 border-blue-200 rounded-full flex items-center justify-center bg-gray-50 shadow-md">
              <Building size={24} className="text-blue-300" />
            </div>
          )}
        </div>
        <div className="flex items-end pb-4">
          <p className="text-xs font-medium text-gray-600">Date: {formData.date || "___________"}</p>
        </div>
      </div>

      {/* Certificate content */}
      <div className="flex flex-col gap-6 mt-4 text-sm">
        <h2 className="text-center font-bold text-lg text-blue-800 border-b-2 border-blue-200 pb-2 w-fit mx-auto px-4">
          To Whomsoever It May Concern
        </h2>
        <p className="text-black leading-relaxed">
          This certificate of employment confirms that {formData.gender == "male" ? "Mr." : "Ms."}{" "}
          <span className="font-medium ">{formData.employeeName || "[Employee Name]"}</span> was a part of our
          organization from <span className="font-medium">{formData.joiningDate || "[Joining Date]"}</span> to{" "}
          <span className="font-medium ">{formData.lastWorkingDate || "[Last Working Date]"}</span>.{" "}
          {pronouns.subject.charAt(0).toUpperCase() + pronouns.subject.slice(1)} held the position of{" "}
          <span className="font-medium ">{formData.designation || "[Designation]"}</span> in our company{" "}
          <span className="font-medium">{formData.companyName || "[Company Name]"}</span> but also handled some other
          departments like <span className="font-medium ">{formData.departments || "[Departments]"}</span> whenever it
          was required.
        </p>

        <p className="text-black leading-relaxed">
          During this tenure,{formData.gender == "male" ? "Mr." : "Ms."}{" "}
          <span className="font-medium ">{formData.employeeName || "[Employee Name]"}</span> has shown great dedication
          and punctuality. We also approve of {pronouns.possessive} character as an understanding and helpful team
          member.
        </p>

        <p className="text-black leading-relaxed">
          Moreover, I would like to reflect over {pronouns.object} conduct during {pronouns.object} stay with us. During{" "}
          {pronouns.object} service {pronouns.subject} has been found sincere, reliable, trustworthy, sociable, pleasant
          and open to challenges {pronouns.subject} has a genial temperament and can efficiently work in a team. All of
          our staff members are pleased with {pronouns.possessive} and feels comfortable in teaming and coordinating
          with {pronouns.possessive} for the realization of organizational goals and objectives.
        </p>

        <p className="text-black leading-relaxed">
          <span className="font-medium ">{formData.employeeName || "[Employee Name]"}</span> is leaving{" "}
          {pronouns.object} job only on of {pronouns.object} own decision and for attempting opportunities with a better
          profile. We wish {pronouns.object} all the best in {pronouns.object} future endeavor. Please feel free to
          contact us for any more details about the employment of{" "}
          <span className="font-medium">{formData.employeeName || "[Employee Name]"}</span>.
        </p>
      </div>

      <div className="mt-10 flex flex-col w-full">
        <p className="font-medium text-black">Sincerely,</p>
        <p className="font-medium mt-1">{formData.authorizer || "[Authorizer Name]"}</p>
        <div className="">
          <p className="text-black">{formData.companyName || "[Company Name]"}</p>
          <p className="text-black text-sm">{formData.companyAddress || "[Company Address]"}</p>
          <div className="flex w-full justify-between">
            <div>
              <div className="h-[200px]"></div>
              <div className="mt-8 border-gray-300 pt-2 w-40">
                <p className="text-black text-center border-t text-sm">Authorizer Signature</p>
              </div>
            </div>
            <div>
              <div className="h-[200px]"></div>
              <div className="mt-8 border-gray-300 pt-2 w-40">
                <p className="text-black text-center border-t text-sm">Company Stamp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate footer with gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-r from-blue-50 to-violet-50"></div>
    </>
  )
}
