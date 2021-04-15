import { Step, StepContent, Stepper } from "@material-ui/core";
import React from "react";
import { SecondStep } from "./SecondStep";
import { CustomLabel, StepIcon } from "./WithdrawFunds";

export function VerticalStepper() {
  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = [
    {
      title: "Подача заявки",
      subtitle:
        "Поздравляем, вы успешно подключили заявку на сайте paybox.money и получили тестовый доступ к системе PayBox",
    },
    {
      title: "Заполнение анкеты",
      subtitle:
        "Заполните анкету, на основании которой вступит в силу договор присоединения к системе PayBox",
    },
    {
      title: "Отправка анкеты менеджеру",
      subtitle:
        "Направьте ранее заполненную анкету и загруженные сканы документов менеджеру PayBox для финального утверждения",
    },
    {
      title: "Проверка предоставленных данных",
      subtitle:
        "Согласование со стороны PayBox. Для завершения этого шага, менеджер может попросить вас внести изменения в анкету или предоставить дополнительные документы",
    },
    {
      title: "Отправка документов",
      subtitle:
        'Отправка оригиналов подписанной с вашей стороны анкеты присоединения и заверенных руководителем копии раннее загруженных документов с подписью "копия верна" и печатью компании Скачайте документы ниже.',
    },
    {
      title: "Запуск системы",
      subtitle:
        "На данном этапе вы переходите в режим приема платежей Если у Вас завершена интеграция можете запросить перевод в боевой режим.",
    },
  ];

  function handleNext() {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  }
  function getStepContent(step) {
    switch (step) {
      case 1:
        return <SecondStep handleNext={handleNext} />;
      case 2:
        return "An ad group contains one or more ads which target a shared set of keywords.";
      case 3:
        return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
      default:
        return "Unknown step";
    }
  }
  return (
    <Stepper
      activeStep={activeStep}
      style={{ backgroundColor: "transparent" }}
      orientation="vertical"
    >
      {steps.map((label, index) => {
        return (
          <Step key={label.title}>
            <CustomLabel
              StepIconComponent={(props) => StepIcon(props, index + 1)}
            >
              <p
                style={{
                  fontSize: 18,
                  color: "inherit",
                  margin: 0,
                  marginLeft: 40,
                }}
              >
                {label.title}
              </p>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 300,
                  color: "inherit",
                  margin: 0,
                  marginTop: 8,
                  marginLeft: 40,
                }}
              >
                {label.subtitle}
              </p>
            </CustomLabel>
            <StepContent>{getStepContent(index)}</StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
}
