// React
import { FC, useEffect } from "react";
// Types
import { TemplateClass } from "types";
import { Teacher } from "@prisma/client";
// Next
import { useRouter } from "next/router";
// SCSS
import classStyles from "../../scss/components/pages/IndividualClass.module.scss";
// Components
import PageTitle from "@/components/home/PageTitle";
import Meta from "@/components/others/Meta";
import SectionLoading from "@/components/loading/SectionLoading";
import ClassDetails from "@/components/classes/ClassDetails";
import ClassCatalogue from "@/components/classes/ClassCatalogue";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
// Data
import { defaultTemplateClass } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getClassById,
  selectClassById,
  selectLoadingClass,
} from "@/redux/slices/classesSlice";
import { State } from "@/redux/api/store";
import { selectProfile } from "@/redux/slices/generalSlice";

const IndividualClass: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const loadingClass = useAppSelector(selectLoadingClass);
  const profile = useAppSelector(selectProfile);

  const foundClass =
    (useAppSelector((state: State) =>
      selectClassById(state, router.query.classId as string)
    ) as TemplateClass) || defaultTemplateClass;

  useEffect(() => {
    if (loadingClass === "IDLE" || router.query.classId) {
      dispatch(getClassById(router.query.classId as string));
    }
  }, [router.query]);

  if (loadingClass === "IDLE" || loadingClass === "PENDING") {
    return (
      <>
        <Meta
          title='Așteptați vă rog... | Liceul Teoretic "Ion Barbu" Pitești'
          desc="Bun venit în clasa... Descoperă o comunitate energică și plină de realizări. Află mai multe despre activitățile noastre și bucură-te de anii de liceu alături de noi."
        />
        <SectionLoading />
      </>
    );
  }

  return (
    <>
      <Meta
        title={`Clasa ${foundClass.label} | Liceul Teoretic "Ion Barbu" Pitești`}
        desc={`Bun venit în clasa ${foundClass.label}! Descoperă o comunitate energică și plină de realizări. Află mai multe despre activitățile noastre și bucură-te de anii de liceu alături de noi.`}
      />
      <main className={classStyles.classContainer}>
        <PageTitle
          title={`Clasa ${foundClass.label}`}
          quote="Unitatea clasei, izvor de putere și înțelepciune."
          backgroundUrl={foundClass.image_url}
          pageId={foundClass.class_uid}
        />
        <ClassDetails {...foundClass} />
        {(profile.role === "ADMIN" ||
          (profile as Teacher).master_class_label === foundClass.label) &&
        (foundClass.students?.length as number) >= 1 ? (
          <ClassCatalogue {...foundClass} />
        ) : null}
      </main>
    </>
  );
};

export default IndividualClass;
