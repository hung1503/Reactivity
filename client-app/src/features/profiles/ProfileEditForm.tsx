import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({ setEditMode }: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();
  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) => {
        updateProfile(values).then(() => setEditMode(false));
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form" autoComplete="off">
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextArea name="bio" placeholder="Bio" rows={3} />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !dirty || !isValid}
            type="submit"
            content="Submit"
            positive
            floated="right"
          />
        </Form>
      )}
    </Formik>
  );
});
