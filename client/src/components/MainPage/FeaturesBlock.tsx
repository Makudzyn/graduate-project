import Card from "./Card.tsx";
import TableIcon from "../../assets/svg/table-tree.svg?react";
import ChartIcon from "../../assets/svg/chart-line.svg?react";
import DataIcon from "../../assets/svg/data.svg?react";
import StatsIcon from "../../assets/svg/stats.svg?react";
import FastIcon from "../../assets/svg/speed-alt.svg?react";
import SmileIcon from "../../assets/svg/slightly-smiling-face.svg?react";
import AllInIcon from "../../assets/svg/all-in.svg?react";
import ManyIcon from "../../assets/svg/list.svg?react";
import ShareIcon from "../../assets/svg/share.svg?react";

const FeaturesBlock = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        <Card
          iconComponent={
            <TableIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
          }
          title="Таблиця поліномів"
          description="
            Ознайомтеся з великою таблицею,
            що надає повний список незвідних поліномів над полем GF (2).
            Таблиця містить найбільший набір поліномів, доступний в інтернеті, і пропонує зручні функції пошуку,
            сортування та інші засоби взаємодії, забезпечуючи легкий доступ до необхідної інформації.
          "
        />
        <Card
          iconComponent={
            <ChartIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
          }
          title="Графіки кореляції"
          description="
            Досліджуйте кореляцію згенерованих послідовностей за допомогою графіків кореляції.
            Інтуїтивно зрозумілі графіки дозволяють оцінити ступінь кореляції та вивчити властивості послідовності.
            Додаткові графічні інтрументи для взаємодії з графіком
            забезпечують більш точне та глибоке розуміння даних,
            допомагаючи краще аналізувати створені послідовності.
          "
        />
        <Card
          iconComponent={
            <DataIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
          }
          title="Збереження даних"
          description="
            Легко зберігате та керуйте історією своїх запитів та даних для генерації послідовностей.
            Зареєстровані користувачі можуть повторно використовувати раніше введені дані та запити,
            це дозволяє економити час та зосереджуватися на дослідженні та аналізі результатів.
          "
        />
      </div>
      <div className="flex flex-wrap justify-between">
        <Card
          iconComponent={
            <StatsIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
          }
          title="Порівняння характеристик"
          description="
            Порівнюйте характеристики та властивості матричного та лінійного генераторів
            безпосередньо поруч один з одним.
            За допомогою спеціальної сторінки можна провести детальний аналіз властивостей
            та ваг Хеммінгу для різних блоків згенерованих послідовностей,
            що допоможе вибрати найбільш підходящий генератор для конкретних потреб та задач.
          "
        />
        <Card
          iconComponent={
            <FastIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
          }
          title="Швидкість"
          description="
            Не турбуйтеся про можливі зависання!
            Завдяки виконанню обчислень на сервері ви миттєво отримаєте результати,
            що забезпечить швидкий та плавний досвід користування.
            Навіть під час роботи з потенційно великими обсягами даних на сайті немає затримок завдяки
            використанню технології windowing для ефективного відображення результатів.
          "
        />
        <Card
          iconComponent={
            <ShareIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
          }
          title="Зручна передача даних"
          description="
            Бажаєте поділитися з кимось результатами своєї генерації?
            Завдяки збереженню параметрів у рядку запиту,
            користувачі можуть легко передавати свої дані іншим користувачам,
            просто надіславши посилання.
            При відкритті посилання всі параметри автоматично завантажуються у відповідні поля,
            що дозволяє швидко та зручно відтворити запит та згенерувати послідовність.
          "
        />
      </div>
      <div className="flex flex-wrap justify-between">
        <Card
          iconComponent={
            <AllInIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
          }
          title="Єдина платформа"
          description="
            Скористайтеся всім, що ми пропонуємо для дослідження та генерації послідовностей на одній платформі!
            Широкий спектр корисних сторінок та генераторів,
            включаючи лінійний генератор, матричний генератор, генератор сум та добутків,
            сторінка для порівняння властивостей лінійного та матричного генераторів з можливістю аналізу їх ваг Хеммінгу,
            а також сторінку з усіма поліномами.
          "
        />
        <Card
          iconComponent={
            <ManyIcon className="mb-4 h-6 w-6 fill-secondary stroke-secondary" />
          }
          title="Розмаїття поліномів"
          description="
            Іноді відчуваєте брак вибору при генерації послідовностей?
            Ми пропонуємо широкий вибір,
            включаючи поліноми до 15-го ступеня,
            які можуть бути використані при генерації.
            Цей різноманітний набір забезпечить вам широкі можливості вибору
            та варіативність під час створення своїх послідовностей.
          "
        />
        <Card
          iconComponent={
            <SmileIcon className="mb-4 h-6 w-6 fill-transparent stroke-secondary" />
          }
          title="Зручний інтерфейс"
          description="
            Часом сайти для генерації надто складні у використанні?
            Ми пропонуємо зручний та привабливий інтерфейс,
            який навіть новачки можуть легко освоїти!
            Використовуючи різноманітні повідомлення, плейсхолдери та тултипи,
            забезпечується проста та інтуїтивно зрозуміла взаємодію з сайтом,
            що робить процес дослідження та генерації послідовностей максимально зручним для всіх користувачів.
          "
        />
      </div>
    </>
  );
};

export default FeaturesBlock;
