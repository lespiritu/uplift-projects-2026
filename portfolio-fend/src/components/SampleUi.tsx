import Button from "./Button";

const SampleUi = () => {
  return (
    <div>
      <h3 className=" bg-surface">Surface</h3>
      <h3 className=" bg-surface-alt">Surface Alt</h3>
      <h3 className=" bg-background">Background</h3>
      <h3 className=" bg-primary">Primary</h3>
      <h3 className=" bg-secondary">Secondary Alt</h3>
      <h3 className=" bg-accent">Accent</h3>
      <h3 className=" bg-text">Text</h3>
      <h3 className=" bg-text-muted">Text Muted</h3>

      <h3 className=" bg-border">Border</h3>

      <h2>Buttons</h2>
      <Button variant="primary">Primary</Button>
      <Button variant="primary-small">Primary-small</Button>

      <Button variant="secondary">Submit</Button>

      <Button variant="secondary-small">Submit</Button>

      <Button variant="outline">Submit</Button>
    </div>
  );
};

export default SampleUi;
