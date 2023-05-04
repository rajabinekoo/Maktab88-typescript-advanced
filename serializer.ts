const excludeFields: Array<string> = [];
const constructors: Array<Function> = [];

export const serializer = (obj: any) => {
  let markedClass = false;
  for (const constructor of constructors) {
    if (obj instanceof constructor) {
        markedClass = true;
    }
  }

  if (!markedClass) return;

  for (const key in obj) {
    if (excludeFields.includes(key)) {
      delete (obj as any)[key];
    }
  }
};

export function exclude(_target: any, propertyKey: string) {
  excludeFields.push(propertyKey);
}

export function serializeClass(constructorFn: Function) {
  constructors.push(constructorFn);
}
