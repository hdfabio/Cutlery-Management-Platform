using mdf.Model.Shared;
using System.Collections.Generic;

namespace mdf.Model.ValueObjects
{
    public class Localizacao : IValueObject
    {
        public string Value { get; set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            return new List<object> {Value};
        }
    }
}