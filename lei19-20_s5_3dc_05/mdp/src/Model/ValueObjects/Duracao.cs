using mdp.Model.Shared;
using System.Collections.Generic;

namespace mdp.Model.ValueObjects
{
    public class Duracao : IValueObject
    {
        public long Value { get; set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            return new List<object> {Value};
        }
    }
}