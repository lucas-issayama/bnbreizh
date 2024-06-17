function sanitizeData(data: any) {
  if (data) {
    if (Array.isArray(data)) {
      return data.map((el) => {
        let attributes = el.attributes;
        if (!attributes) attributes = {};

        attributes.id = parseInt(el.id);
        if (attributes) {
          const keys = Object.keys(attributes);
          for (var a = 0; a < keys.length; a++) {
            if (attributes[keys[a]] && attributes[keys[a]].data) {
              attributes[keys[a]] = sanitizeData(attributes[keys[a]].data);
            }
          }
          return attributes;
        } else {
          return null;
        }
      });
    } else {
      let attributes = data.attributes;
      if (attributes) {
        const keys = Object.keys(attributes);
        for (var a = 0; a < keys.length; a++) {
          if (attributes[keys[a]] && attributes[keys[a]].data) {
            attributes[keys[a]] = sanitizeData(attributes[keys[a]].data);
          }
        }
        return { id: parseInt(data.id), ...data.attributes };
      } else {
        return { id: parseInt(data.id) };
      }
    }
  }
}

export default sanitizeData;
